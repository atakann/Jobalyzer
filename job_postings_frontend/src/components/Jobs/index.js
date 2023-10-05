import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/jobs/jobs-paginated?page=${page}&limit=10`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Jobs</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Normalized Title</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>ZipCode</TableCell>
              <TableCell>Annual Salary Avg</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.map(job => (
              <TableRow key={job._id}>
                <TableCell>{job.normalizedTitle}</TableCell>
                <TableCell>{job.industry}</TableCell>
                <TableCell>{job.city}</TableCell>
                <TableCell>{job.state}</TableCell>
                <TableCell>{job.zipCode}</TableCell>
                <TableCell>{job.annualSalaryAvg}</TableCell>
                <TableCell>{job.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <div style={{ marginTop: '20px' }}>
        <Button variant="outlined" disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Previous</Button>
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>Page {page}</span>
        <Button variant="outlined" onClick={() => setPage(prev => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}
