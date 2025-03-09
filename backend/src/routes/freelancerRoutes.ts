import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// Get all freelancers
router.get('/list', async (req, res) => {
  try {
    // TODO: Implement freelancer listing logic
    const freelancers = [
      {
        _id: '1',
        name: 'John Doe',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        skills: ['React', 'Node.js', 'TypeScript'],
        hourlyRate: 25,
        expertise: ['Web Development', 'Backend Development'],
        rating: 4.8,
        reviews: 12,
        availability: true,
        bio: 'Full stack developer with 2 years of experience'
      },
      // Add more mock freelancers as needed
    ];
    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Hire a freelancer
router.post('/hire', async (req, res) => {
  try {
    const { freelancerId, clientId, projectDetails } = req.body;
    // TODO: Implement hire freelancer logic
    res.json({ 
      success: true, 
      message: 'Hire request sent successfully',
      data: {
        freelancerId,
        clientId,
        projectDetails,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router; 