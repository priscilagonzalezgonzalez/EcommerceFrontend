import { z } from 'zod';

export const bannerSchema = z.object({
    mainTitle: z.string(),
    subtitle: z.string(),
    linkTo: z.string()
});

// extract the inferred type
export type banner = z.infer<typeof bannerSchema>