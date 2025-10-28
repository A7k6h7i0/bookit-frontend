import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchQuery(searchParams.get('search') || '');
  }, [location]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      navigate(`/`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo EXACT match */}
<Link to="/" className="flex items-center">
  {/* Styled SVG pin with "hd" */}
  <svg
    viewBox="0 0 50 65"
    className="w-12 h-16 mr-3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ minWidth: 48 }}
  >
    {/* Pin background */}
    <ellipse cx="25" cy="22" rx="20" ry="20" fill="#111" />
    {/* Pin point */}
    <path d="M25 62 C31 52,45 37,45 22 A20 20 0 1 0 5 22 C5 37,19 52,25 62 Z" fill="#111" />
    {/* Smile */}
    <path d="M15 27 Q25 35 35 27" stroke="#eabd27" strokeWidth="2" fill="none" />
    {/* Vertical guide */}
    <rect x="24" y="7" width="2" height="20" fill="#eabd27" rx="1" />
    {/* 'hd' letters */}
    <text x="13.5" y="26" fontFamily="Inter,Arial,sans-serif" fontSize="16" fontWeight="700" fill="#ffe066">
      hd
    </text>
  </svg>
  {/* Text part */}
  <div style={{ lineHeight: 1 }}>
    <span className="block font-bold text-xl text-black leading-tight" style={{fontFamily:'Inter,Arial,sans-serif'}}>highway</span>
    <span className="block font-bold text-xl text-black leading-tight" style={{fontFamily:'Inter,Arial,sans-serif'}}>delite</span>
  </div>
</Link>


        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search experiences"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-secondary font-semibold px-6 py-2 rounded-r-lg hover:bg-yellow-500 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
