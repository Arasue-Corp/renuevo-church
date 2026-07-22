'use server';

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Create a Sanity client with the write token
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function submitBusiness(formData: FormData) {
  try {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('Missing SANITY_API_WRITE_TOKEN in environment variables.');
      return { success: false, error: 'Server configuration error' };
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const website = formData.get('website') as string;
    const categoriesJson = formData.get('categories') as string;
    const logoFile = formData.get('logo') as File | null;

    if (!name || !description || !phone || !categoriesJson) {
      return { success: false, error: 'Missing required fields' };
    }

    let categories: string[] = [];
    try {
      categories = JSON.parse(categoriesJson);
    } catch (e) {
      return { success: false, error: 'Invalid categories format' };
    }

    let logoAssetId = null;

    if (logoFile && logoFile.size > 0) {
      if (logoFile.size > 5 * 1024 * 1024) {
        return { success: false, error: 'El logo debe ser menor a 5MB / Logo must be under 5MB' };
      }
      
      const buffer = await logoFile.arrayBuffer();
      // Upload asset to Sanity
      const asset = await writeClient.assets.upload('image', Buffer.from(buffer), {
        filename: logoFile.name,
        contentType: logoFile.type
      });
      logoAssetId = asset._id;
    }

    const doc: any = {
      _type: 'business',
      name: name,
      description: description,
      contactPhone: phone,
      contactEmail: email || '',
      website: website || '',
      categories: categories,
      isApproved: false, // Requires admin approval
    };

    if (logoAssetId) {
      doc.logo = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: logoAssetId
        }
      };
    }

    const result = await writeClient.create(doc);
    return { success: true, id: result._id };
  } catch (error) {
    console.error('Error submitting business:', error);
    return { success: false, error: 'Ocurrió un error al enviar el formulario / Failed to submit form' };
  }
}
