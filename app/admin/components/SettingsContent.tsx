"use client";

import { BellRing, Volume2, VolumeX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsContentProps {
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
}

export default function SettingsContent({ soundEnabled, onToggleSound }: SettingsContentProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="border-amber-100 bg-white/90 shadow-sm backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-amber-50/50 border-b border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-amber-900">Notifications</CardTitle>
              <CardDescription className="text-amber-600">
                Manage how you receive alerts for new orders.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between p-4 rounded-xl border border-amber-50 bg-amber-50/30">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${soundEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="sound-notifications" className="text-base font-semibold text-amber-900">
                  Sound Alerts
                </Label>
                <p className="text-sm text-amber-600/70">
                  Play a notification sound whenever a new order is placed.
                </p>
              </div>
            </div>
            <Switch
              id="sound-notifications"
              checked={soundEnabled}
              onCheckedChange={onToggleSound}
              className="data-[state=checked]:bg-amber-600"
            />
          </div>
          
          <div className="mt-8 p-4 rounded-xl border border-blue-50 bg-blue-50/20">
            <p className="text-xs text-blue-600 font-medium leading-relaxed">
              <strong>Note:</strong> Settings are saved locally to your browser and only apply to this device. 
              Make sure your device volume is turned up to hear alerts.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Placeholder for future settings */}
      <Card className="border-dashed border-2 border-amber-100 bg-transparent opacity-50">
        <CardContent className="py-12 flex flex-col items-center justify-center text-amber-400">
          <p className="text-sm font-medium">More settings coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
