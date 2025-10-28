import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExperienceCard from '../components/ExperienceCard';
import Footer from '../components/Footer';
import { getAllExperiences } from '../services/api';
import { Experience } from '../types';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filtered = experiences.filter(exp =>
        exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExperiences(filtered);
    } else {
      setFilteredExperiences(experiences); // Show all when search is empty
    }
  }, [searchQuery, experiences]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await getAllExperiences();
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Search Result Header */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-gray-600 mt-2">
              {filteredExperiences.length} experience(s) found
            </p>
          </div>
        )}

        {/* Experiences Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-900">No experiences found</h3>
            <p className="mt-1 text-gray-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
