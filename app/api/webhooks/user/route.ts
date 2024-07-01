import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { UserWebhookEvent } from '@clerk/nextjs/server';
import prisma from '../../../../prisma/db';


async function handler (request: Request) {

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }
  
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  //Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  //event will be of type WebhookEvent
  let event: UserWebhookEvent;

  // Verify the payload with the headers
  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as UserWebhookEvent;

    // Do something with the payload depending on eventType
    const eventType = event.type;
    console.log('eventType', eventType);

    const { id, username, first_name, last_name, email_addresses } = event.data;
    console.log('id: ', id, 'username: ', username, 'first name: ', first_name, 'last name: ', last_name, 'email addresses: ', email_addresses[0].email_address);
    
    if (eventType === 'user.created' || eventType === 'user.updated') {
      
      await prisma.user.upsert({
        where: {
          email: email_addresses[0].email_address,
          clerkId: id
        },
        update: {
          username: username,
          name: first_name,
          lastName: last_name,
          email: email_addresses[0].email_address,
        },
        create: {
          clerkId: id,
          username: username,
          name: first_name,
          lastName: last_name,
          email: email_addresses[0].email_address,
        }
      }   
      );
    }

  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }



  return new Response('', { status: 200 });
};

export const POST = handler;
export const PUT = handler;