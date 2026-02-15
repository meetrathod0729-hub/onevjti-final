import { useEffect, useState } from 'react';
import CommitteeCard from '../components/CommitteeCard';
import api from "../api/axios";

const Committees = () => {
    const [committees, setCommittees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchCommittees = async () => {
            try {
                // Adjust this endpoint if your backend route is different (e.g., /api/v1/committees)
                const res = await api.get("/committees");
                setCommittees(res.data.data || []);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Failed to load committees");
            } finally {
                setLoading(false);
            }
        };
        fetchCommittees();
    }, [window.location.pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
               Loading committees...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
                {error}
            </div>
        );
    }

    if (committees.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                No committees available at the moment.
            </div>
        );
    }

    return (
        <div className="min-h-screen px-8 py-10 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Committees 
            </h1>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {committees.map((committee) => (
                    <CommitteeCard key={committee._id} committee={committee} />
                ))}
            </div>
        </div>
    );  
};

export default Committees;