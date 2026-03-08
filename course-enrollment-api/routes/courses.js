import { Router } from 'express';
const router = Router();
import supabase from '../supabaseClient.js';
import validateEnrollment from '../middleware/validateEnrollment.js';

router.post('/courses', async (req, res) => {
  const { id, title, instructor } = req.body;
  const { data, error } = await supabase.from('courses')
    .insert([{ id, title, instructor }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// 1. Get All Courses
router.get('/courses', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 2. Enroll a Student
router.post('/enroll', validateEnrollment, async (req, res) => {
  const { student_name, course_id } = req.body;
  const { data, error } = await supabase.from('enrollments')
    .insert([{ student_name, course_id }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// 3. Get Enrollments for a Course
router.get('/courses/:id/enrollments', async (req, res) => {
  const courseId = req.params.id;
  const { data, error } = await supabase.from('enrollments')
    .select('student_name, course_id')
    .eq('course_id', courseId);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;

