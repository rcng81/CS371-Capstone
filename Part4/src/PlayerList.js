import React, { useEffect, useState } from 'react';
import './PlayerList.css';

function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
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

    useEffect(() => {
        fetch('http://localhost:5000/players')
            .then((response) => response.json())
            .then((data) => setPlayers(data))
            .catch((error) => console.error('Error fetching players:', error));
    }, []);

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
                setFormVisible(false);

                const updatedPlayers = await fetch('http://localhost:5000/players')
                    .then((res) => res.json())
                    .catch((error) => console.error('Error fetching players:', error));
                setPlayers(updatedPlayers);
            } else {
                alert('Error adding player.');
            }
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this player?')) return;

        try {
            const response = await fetch(`http://localhost:5000/players/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Player deleted successfully!');
                const updatedPlayers = players.filter((player) => player.ID !== id);
                setPlayers(updatedPlayers);
            } else {
                alert('Error deleting player.');
            }
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    return (
        <div>
            <h2>Player List</h2>
            <button
                onClick={() => setFormVisible(!formVisible)}
                style={{ marginBottom: '20px' }}
            >
                {formVisible ? 'Hide Add Player Form' : 'Add Player'}
            </button>
            {formVisible && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
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
                    <div>
                        <label>SPG:</label>
                        <input
                            name="spg"
                            type="number"
                            value={formData.spg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>BPG:</label>
                        <input
                            name="bpg"
                            type="number"
                            value={formData.bpg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>TPG:</label>
                        <input
                            name="tpg"
                            type="number"
                            value={formData.tpg}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '20px' }}>
                        Confirm Add Player
                    </button>
                </form>
            )}
            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Team Name</th>
                        <th>Position</th>
                        <th>Age</th>
                        <th>PPG</th>
                        <th>RPG</th>
                        <th>APG</th>
                        <th>SPG</th>
                        <th>BPG</th>
                        <th>TPG</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.ID}>
                            <td>{player.player_name}</td>
                            <td>{player.team_name}</td>
                            <td>{player.position}</td>
                            <td>{player.age}</td>
                            <td>{player.ppg}</td>
                            <td>{player.rpg}</td>
                            <td>{player.apg}</td>
                            <td>{player.spg}</td>
                            <td>{player.bpg}</td>
                            <td>{player.tpg}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(player.ID)}
                                    style={{ color: 'black' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlayerList;
