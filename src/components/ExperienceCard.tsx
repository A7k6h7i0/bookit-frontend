import React from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="card">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-secondary">{experience.name}</h3>
          <span className="bg-gray-200 text-xs px-2 py-1 rounded text-secondary">
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {experience.description}
        </p>

        {/* Price and Button */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">From</span>
            <p className="text-lg font-bold text-secondary">₹{experience.basePrice}</p>
          </div>
          <Link to={`/experience/${experience._id}`}>
            <button className="btn-primary">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
