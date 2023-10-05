const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

/**
 * @swagger
 * components:
 *  schemas:
 *    Company:
 *      type: object
 *      required:
 *        - companyID
 *        - name
 *      properties:
 *        companyID:
 *          type: string
 *          description: Unique identifier for the company
 *        name:
 *          type: string
 *          description: Name of the company
 *        industry:
 *          type: string
 *          description: Industry the company belongs to
 *      example:
 *        companyID: "ABC123"
 *        name: "TechCorp"
 *        industry: "Technology"
 * 
 *    Stats:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: A field representing a statistic parameter (could be company name, skill, state etc.)
 *        count:
 *          type: number
 *          description: Count of jobs corresponding to that statistic parameter
 *      example:
 *        _id: "TechCorp"
 *        count: 500
 */

/**
 * @swagger
 * /stats/jobs-per-company:
 *  get:
 *    summary: Retrieve number of jobs per company
 *    tags: [Stats]
 *    responses:
 *      200:
 *        description: List of job counts per company
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Stats'
 *      404:
 *        description: No statistics found for jobs per company
 *      500:
 *        description: Server error
 */
router.get('/jobs-per-company', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            // Convert companyId string to ObjectId
            { $addFields: { convertedCompanyId: { $toObjectId: "$companyId" } } },
            
            // Group by the converted companyId to count jobs
            { $group: { _id: "$convertedCompanyId", count: { $sum: 1 } } },

            // Join with companies collection to get company details
            { $lookup: {
                from: "companies",
                localField: "_id",
                foreignField: "_id",
                as: "companyDetails"
            }},
            
            // Unwind to flatten the structure
            { $unwind: "$companyDetails" },

            // Project only the desired fields (company name and job count)
            { $project: {
                _id: 0,
                companyName: "$companyDetails.name",
                jobCount: "$count"
            }}
        ]);

        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per company.' });
        }
        res.json(stats);
    } catch (err) {
        console.error(err); // Log the detailed error
        res.status(500).json({ message: err.message });
    }
});


// Get number of jobs per location (state)
router.get('/jobs-per-state', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $group: { _id: "$state", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per location.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobs-per-city', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $group: { _id: "$city", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per city.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobs-per-skill', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $unwind: "$skill" },
            { $group: { _id: "$skill", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per skill.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobs-per-softskill', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $unwind: "$softSkill" },
            { $group: { _id: "$softSkill", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per soft skill.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobs-per-qualification', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $unwind: "$qualification" },
            { $group: { _id: "$qualification", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per qualification.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobs-per-zipcode', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $group: { _id: "$zipCode", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per zipcode.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/jobs-per-salarytype', async (req, res) => {
    try {
        const stats = await Job.aggregate([
            { $group: { _id: "$salaryType", count: { $sum: 1 } } }
        ]);
        if (stats.length === 0) {
            return res.status(404).json({ message: 'No statistics found for jobs per salary type.' });
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
