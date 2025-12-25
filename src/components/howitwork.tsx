import React from 'react';
import { Shield } from 'lucide-react';

export function Howitwork() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="w-full px-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Detection made simple in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 h-full">
                  <div className="text-6xl font-bold text-teal-100 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-teal-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

export default Howitwork;
