import React, { useState } from 'react';

function AddPlayer() {
    const [formData, setFormData] = useState({
        player_name: '',
        team_name: '',
        position: '',
        age: '',
        ppg: '',
        rpg: '',
        apg: '',
        spg: '',
        bpg: '',
        tpg: '',
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Player added successfully!');
                setFormData({
                    player_name: '',
                    team_name: '',
                    position: '',
                    age: '',
                    ppg: '',
                    rpg: '',
                    apg: '',
                    spg: '',
                    bpg: '',
                    tpg: '',
                });
                setIsFormVisible(false);
            } else {
                alert('Error adding player.');
            }
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setIsFormVisible(!isFormVisible)} style={{ marginBottom: '20px' }}>
                {isFormVisible ? 'Hide Add Player Form' : 'Add Player'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Player Name:</label>
                        <input
                            name="player_name"
                            value={formData.player_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Team Name:</label>
                        <input
                            name="team_name"
                            value={formData.team_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Position:</label>
                        <input
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>PPG:</label>
                        <input
                            name="ppg"
                            type="number"
                            value={formData.ppg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>RPG:</label>
                        <input
                            name="rpg"
                            type="number"
                            value={formData.rpg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>APG:</label>
                        <input
                            name="apg"
                            type="number"
                            value={formData.apg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '20px' }}>
                        Confirm Add Player
                    </button>
                </form>
            )}
        </div>
    );
}

export default AddPlayer;
