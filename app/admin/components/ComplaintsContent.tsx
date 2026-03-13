"use client";

import { AlertCircle, CheckCircle2, Clock, MessageSquare, Tag, User } from "lucide-react";
import { Complaint } from "../types";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ComplaintsContentProps {
  complaints: Complaint[];
  loading: boolean;
  onToggleStatus: (id: string, currentStatus: "open" | "closed") => void;
}

export default function ComplaintsContent({ complaints, loading, onToggleStatus }: ComplaintsContentProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
        <p className="text-amber-900/60 font-bold uppercase tracking-widest text-xs">Loading Complaints...</p>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-dashed border-amber-200 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-200">
          <MessageSquare size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-900">All Quiet Here</h3>
          <p className="text-amber-600/60 max-w-xs mx-auto">No customer complaints have been filed yet. Good job!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {complaints.map((complaint) => (
          <div 
            key={complaint.id}
            className={cn(
              "bg-white rounded-3xl border transition-all duration-300 overflow-hidden",
              complaint.status === "open" 
                ? "border-amber-100 shadow-lg shadow-amber-900/5 ring-1 ring-amber-500/5" 
                : "border-gray-100 opacity-75 grayscale-[0.5]"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-none",
                    complaint.status === "open" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                  )}>
                    {complaint.status}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <Clock size={14} />
                    {complaint.createdAt?.toDate ? new Intl.DateTimeFormat('en-NG', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    }).format(complaint.createdAt.toDate()) : "Recent"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                      <User size={16} />
                    </div>
                    <h4 className="font-black text-amber-900">{complaint.customerName}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400">
                      <Tag size={16} />
                    </div>
                    <code className="text-xs font-black bg-gray-100 px-2 py-1 rounded-md text-gray-600 uppercase">
                      ID: {complaint.orderId}
                    </code>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 italic text-stone-700 text-sm leading-relaxed">
                   "{complaint.complaintText}"
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 py-4 md:py-0 md:pl-8 md:border-l border-gray-100">
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mark as fixed</p>
                  <Switch 
                    checked={complaint.status === "closed"}
                    onCheckedChange={() => onToggleStatus(complaint.id, complaint.status)}
                    className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-amber-500"
                  />
                </div>
                {complaint.status === "closed" ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 animate-in zoom-in" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-amber-500 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
