'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from './drizzle';
import { folders, threadFolders } from './schema';

const sendEmailSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
  recipientEmail: z.string().email('Invalid email address'),
});

/**
 * Send a new email
 */
export async function sendEmailAction(_: any, formData: FormData) {
  if (process.env.VERCEL_ENV === 'production') {
    return {
      error: 'Sending emails is disabled in production',
      previous: {
        recipientEmail: formData.get('recipientEmail'),
        subject: formData.get('subject'),
        body: formData.get('body'),
      },
    };
  }

  const recipientEmail = formData.get('recipientEmail');
  const subject = formData.get('subject');
  const body = formData.get('body');

  if (!recipientEmail || typeof recipientEmail !== 'string') {
    return {
      error: 'Recipient email is required',
      previous: { recipientEmail, subject, body },
    };
  }

  if (!subject || typeof subject !== 'string') {
    return {
      error: 'Subject is required',
      previous: { recipientEmail, subject, body },
    };
  }

  if (!body || typeof body !== 'string') {
    return {
      error: 'Email body is required',
      previous: { recipientEmail, subject, body },
    };
  }

  try {
    // Create implementation for sending emails
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      error: 'Failed to send email',
      previous: { recipientEmail, subject, body },
    };
  }
}

/**
 * Move a thread to the Done/Archive folder
 */
export async function moveThreadToDone(_: any, formData: FormData) {
  if (process.env.VERCEL_ENV === 'production') {
    return {
      error: 'Only works on localhost for now',
    };
  }

  let threadId = formData.get('threadId');

  if (!threadId || typeof threadId !== 'string') {
    return { error: 'Invalid thread ID', success: false };
  }

  try {
    let doneFolder = await db.query.folders.findFirst({
      where: eq(folders.name, 'Archive'),
    });

    if (!doneFolder) {
      return { error: 'Done folder not found', success: false };
    }

    let parsedThreadId = parseInt(threadId, 10);

    await db
      .delete(threadFolders)
      .where(eq(threadFolders.threadId, parsedThreadId));

    await db.insert(threadFolders).values({
      threadId: parsedThreadId,
      folderId: doneFolder.id,
    });

    revalidatePath('/mail/[name]');
    revalidatePath('/mail/[name]/[id]');
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to move thread to Done:', error);
    return { success: false, error: 'Failed to move thread to Done' };
  }
}

/**
 * Move a thread to the Trash folder
 */
export async function moveThreadToTrash(_: any, formData: FormData) {
  if (process.env.VERCEL_ENV === 'production') {
    return {
      error: 'Only works on localhost for now',
    };
  }

  let threadId = formData.get('threadId');

  if (!threadId || typeof threadId !== 'string') {
    return { error: 'Invalid thread ID', success: false };
  }

  try {
    let trashFolder = await db.query.folders.findFirst({
      where: eq(folders.name, 'Trash'),
    });

    if (!trashFolder) {
      return { error: 'Trash folder not found', success: false };
    }

    let parsedThreadId = parseInt(threadId, 10);

    await db
      .delete(threadFolders)
      .where(eq(threadFolders.threadId, parsedThreadId));

    await db.insert(threadFolders).values({
      threadId: parsedThreadId,
      folderId: trashFolder.id,
    });

    revalidatePath('/mail/[name]');
    revalidatePath('/mail/[name]/[id]');
    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to move thread to Trash:', error);
    return { success: false, error: 'Failed to move thread to Trash' };
  }
}
