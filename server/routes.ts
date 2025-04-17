import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API routes
  app.get('/api/health', (_req: Request, res: Response) => {
    try {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    } catch (error) {
      console.error('Health check error:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });

  // Contact form submission endpoint
  app.post('/api/contact', async (req: Request<{}, {}, ContactFormData>, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          status: 'error',
          message: 'All fields are required',
          fields: { name, email, subject, message }
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid email format'
        });
      }
      
      // In a real app, you would process the contact form here
      // e.g., send an email, store in database, etc.
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return res.status(200).json({ 
        status: 'success',
        message: 'Message received successfully',
        data: { name, email, subject }
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to process contact form',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  });

  return httpServer;
}
