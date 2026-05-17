import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function run() {
  try {
    await schema.parseAsync({ email: 'invalid', password: '' });
  } catch (error: any) {
    console.log("instanceof ZodError:", error instanceof z.ZodError);
    console.log("error.errors:", typeof error.errors);
    console.log("error.issues:", typeof error.issues);
  }
}

run();
