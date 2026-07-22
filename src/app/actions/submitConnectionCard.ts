'use server';

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Create a Sanity client with the write token
// We construct it here to avoid exposing the write token to the client side
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export type ConnectionCardData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  maritalStatus: string;
  interests: string[];
};

export async function submitConnectionCard(data: ConnectionCardData) {
  try {
    if (!data.name) {
      return { success: false, error: 'Name is required' };
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('Missing SANITY_API_WRITE_TOKEN in environment variables.');
      return { success: false, error: 'Server configuration error' };
    }

    const doc = {
      _type: 'connectionCard',
      name: data.name,
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      zip: data.zip || '',
      maritalStatus: data.maritalStatus || '',
      interests: data.interests || [],
      submittedAt: new Date().toISOString(),
    };

    const result = await writeClient.create(doc);
    return { success: true, id: result._id };
  } catch (error) {
    console.error('Error submitting connection card:', error);
    return { success: false, error: 'Failed to submit form. Please try again later.' };
  }
}
