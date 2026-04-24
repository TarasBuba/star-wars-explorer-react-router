import { useState, useEffect } from 'react';
import { InferenceClient } from '@huggingface/inference';

const client = new InferenceClient(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const useFluxGenerationImage = (prompt: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prompt) return;

    let objectUrl: string;

    const generateImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const blob = await client.textToImage({
          model: 'black-forest-labs/FLUX.1-schnell',
          inputs: prompt,
        });
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      } catch (err) {
        setError('Failed to generate image');
      } finally {
        setLoading(false);
      }
    };

    generateImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [prompt]);

  return { imageUrl, loading, error };
};
