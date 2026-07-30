import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Calendar, ArrowRight } from 'lucide-react';

export interface Project {
  _id: string;
  title: string;
  category: string;
  shortDescription?: string;
  description?: string;
  fullDescription?: string;
  budget: number;
  deadline: string;
  skills?: string[];
  status?: string;
  createdAt?: string;
  createdBy?: any;
}

interface ProjectCardProps {
  project: Project;
  actionButton?: React.ReactNode;
  showStatus?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  actionButton,
  showStatus = false,
}) => {
  const desc = project.shortDescription || project.description || project.fullDescription || '';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg hover:shadow-indigo-500/5 group">
      <div className="space-y-4">
        {/* Badges */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {project.category}
          </span>
          {showStatus && (
            <span className="text-xs text-emerald-400 font-medium capitalize bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {project.status || 'open'}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
          {desc}
        </p>

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/60"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 4 && (
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md">
                +{project.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 font-bold text-white text-sm">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>${project.budget}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>{new Date(project.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        {actionButton ? (
          actionButton
        ) : (
          <Link
            to={`/projects/${project._id}`}
            className="w-full bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs border border-slate-700 hover:border-indigo-500"
          >
            View Details & Apply <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};