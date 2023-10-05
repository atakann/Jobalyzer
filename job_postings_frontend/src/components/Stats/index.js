import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Stats() {
    const [stateData, setStateData] = useState([]);
    const [salaryTypeData, setSalaryTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStateData = async () => {
            try {
                const response = await fetch('http://localhost:5000/stats/jobs-per-state');
                const result = await response.json();
                setStateData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchSalaryTypeData = async () => {
            try {
                const response = await fetch('http://localhost:5000/stats/jobs-per-salarytype');
                const result = await response.json();
                setSalaryTypeData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStateData();
        fetchSalaryTypeData();

        setLoading(false);
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* Bar Chart for Jobs per State */}
            <div style={{ width: '100%', height: 300, marginBottom: '50px', border: '1px solid #eee', padding: '20px', borderRadius: '5px' }}>
                <h2 style={{ textAlign: 'center' }}>Jobs Per State</h2>
                <BarChart width={600} height={300} data={stateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </div>

            {/* Pie Chart for Distribution of Salary Types */}
            <div style={{ width: '100%', height: 400, border: '1px solid #eee', padding: '20px', borderRadius: '5px' }}>
                <h2 style={{ textAlign: 'center' }}>Salary Types</h2>
                <PieChart width={400} height={320}>
                    <Pie
                        data={salaryTypeData}
                        cx={200}
                        cy={150}
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="_id"
                    >
                        {
                            salaryTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
}

export default Stats;
