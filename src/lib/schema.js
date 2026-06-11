import { z } from 'zod'

export const personalSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  title: z.string().min(2, 'Title must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  avatar: z.string().url('Invalid URL').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional().or(z.literal('')),
  resume: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Required'),
  role: z.string().min(1, 'Required'),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean(),
  description: z.string().optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
})

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
})

export const skillSchema = z.object({
  category: z.string().min(1, 'Required'),
  items: z.array(z.string()).default([]),
})

export const socialSchema = z.object({
  platform: z.string().min(1, 'Required'),
  url: z.string().url('Invalid URL'),
})

export const themeSchema = z.object({
  template: z.enum(['modern', 'classic', 'minimal']).default('modern'),
  primary: z.string().default('#2563eb'),
  secondary: z.string().default('#1e293b'),
  background: z.string().default('#ffffff'),
  text: z.string().default('#1f2937'),
  font: z.enum(['inter', 'poppins', 'roboto', 'opensans']).default('inter'),
  spacing: z.enum(['compact', 'normal', 'relaxed']).default('normal'),
})

export const portfolioSchema = z.object({
  personal: personalSchema,
  experience: z.array(experienceSchema).default([]),
  projects: z.array(projectSchema).default([]),
  skills: z.array(skillSchema).default([]),
  education: z.array(z.object({
    id: z.string(),
    school: z.string().min(1, 'Required'),
    degree: z.string().min(1, 'Required'),
    field: z.string().optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
  })).default([]),
  socials: z.array(socialSchema).default([]),
  theme: themeSchema,
})
