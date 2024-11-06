import React, { useState } from 'react';
import ArtistApp from './Artist/ArtistApp';
import ClientApp from './Client/ClientApp';
import './App.css'; // Global styles
import ProfileModal from './Profile/ProfileModal'; // Import Profile Modal

const App = () => {
    const [isArtist, setIsArtist] = useState(true); // Toggle between Artist and Client
    const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle Profile modal visibility
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="app-container">
            {/* Header Section */}
            <header className="header">
                <div className="logo">MusicNFT</div>

                <div className="header-right">
                    <div className="tab-container">
                        <button 
                            onClick={() => setIsArtist(true)} 
                            className={`tab-button ${isArtist ? 'active' : ''}`}
                        >
                            Artist
                        </button>
                        <button 
                            onClick={() => setIsArtist(false)} 
                            className={`tab-button ${!isArtist ? 'active' : ''}`}
                        >
                            Client
                        </button>
                    </div>

                    <div className="search-profile">
                        <input 
                            type="text" 
                            placeholder="Search NFTs..." 
                            className="search-bar" 
                            value={searchQuery} 
                            onChange={handleSearchChange} // Update search query
                        />
                        <div 
                            className="profile-tab" 
                            onClick={() => setIsProfileOpen(true)} // Open profile modal
                        >
                            Profile
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            {isArtist ? <ArtistApp /> : <ClientApp searchQuery={searchQuery} />} {/* Pass search query to ClientApp */}

            {/* Profile Modal */}
            {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}
        </div>
    );
};

export default App;
