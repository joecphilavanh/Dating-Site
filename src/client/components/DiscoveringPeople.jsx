import React, { useEffect, useState } from 'react';

const FetchProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            const supabaseUrl = 'https://adzycihptqfmbpsszovy.supabase.co';
            const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkenljaWhwdHFmbWJwc3N6b3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MTU0OTMsImV4cCI6MjAyMDQ5MTQ5M30.MlKLeycCuaHOfnlxqtav5j6g_iD3tEp0UzId1z-MTqM';

            try {
                const response = await fetch(`${supabaseUrl}/rest/v1/Profiles`, {
                    headers: {
                        'apikey': supabaseAnonKey,
                        'Authorization': `Bearer ${supabaseAnonKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                setProfiles(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfiles();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Profiles</h2>
            <div>
                {profiles.map((profile, index) => (
                    <div key={index}>
                        <img src={profile.picture_url} alt={`Profile ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default FetchProfiles;