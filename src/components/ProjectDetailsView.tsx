import React from 'react';
import type { Project } from './ProjectCard'; // ✅ Type-only import fixed
import { DollarSign, Calendar, Tag, CheckCircle2 } from 'lucide-react';

interface ProjectDetailsViewProps {
  project: Project;
}

export const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = ({ project }) => {
  const fullDesc = project.fullDescription || project.description || project.shortDescription || '';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {project.category}
          </span>
          <span className="text-xs text-emerald-400 font-medium capitalize bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {project.status || 'open'}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h1>
      </div>

      {/* Meta Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-800">
        <div>
          <p className="text-xs text-slate-400 mb-1">Budget</p>
          <p className="text-lg font-bold text-emerald-400 flex items-center">
            <DollarSign className="w-5 h-5" />
            {project.budget}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Deadline</p>
          <p className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-1">
            <Calendar className="w-4 h-4 text-indigo-400" />
            {new Date(project.deadline).toLocaleDateString()}
          </p>
        </div>

        <div className="col-span-2 md:col-span-1">
          <p className="text-xs text-slate-400 mb-1">Posted On</p>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recently'}
          </p>
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-200">Project Overview</h3>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{fullDesc}</p>
      </div>

      {/* Required Skills */}
      {project.skills && project.skills.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-indigo-400" /> Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};