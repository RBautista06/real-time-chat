import { Settings, MessageSquare, User, Send } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Customize your experience</p>
            </div>
          </div>

          {/* Theme Selection Section - Replace with Daisy UI */}
          <div className="bg-card rounded-lg border p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Theme</h2>
              <p className="text-sm text-muted-foreground">
                Choose your preferred color scheme
              </p>
            </div>

            {/* This is where you'll add your Daisy UI theme selection */}
            <div className="p-4 border-2 border-dashed border-muted rounded-lg text-center">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`btn btn-sm h-auto px-3 py-2 overflow-hidden rounded-lg shadow-md transition-all flex flex-col items-center gap-2 capitalize ${
                      theme === t ? "btn-primary text-base-100" : ""
                    }`}>
                    {/* Preview theme colors */}
                    <div
                      className="w-full h-7 rounded overflow-hidden border border-base-200 shadow-md"
                      data-theme={t}>
                      <div className="grid grid-cols-4 h-full w-full gap-0.5 p-1">
                        <div className="h-full rounded bg-primary" />
                        <div className="h-full rounded bg-secondary" />
                        <div className="h-full rounded bg-accent" />
                        <div className="h-full rounded bg-neutral" />
                      </div>
                    </div>
                    <span className="text-xs">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Preview Section */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="p-4 border-b bg-muted/50">
              <div className="flex items-center gap-3">
                <MessageSquare className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Chat Preview</h2>
                <span className="text-sm text-muted-foreground">
                  See how your theme looks
                </span>
              </div>
            </div>

            <div className="p-4 space-y-4 max-auto">
              {/* Sample Messages */}
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Sarah Johnson</span>
                    <span className="text-xs text-muted-foreground">
                      2:30 PM
                    </span>
                  </div>
                  <div className="bg-muted rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hey! How's the new project coming along?
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="text-xs text-muted-foreground">
                        2:32 PM
                      </span>
                      <span className="font-medium text-sm">You</span>
                    </div>
                    <div className="bg-primary rounded-lg p-3">
                      <p className="text-sm text-primary-foreground">
                        It's going great! Just finished the UI mockups. Want to
                        take a look?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="size-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="size-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">Sarah Johnson</span>
                    <span className="text-xs text-muted-foreground">
                      2:35 PM
                    </span>
                  </div>
                  <div className="bg-muted rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Send them over when you're ready 🎨
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="text-xs text-muted-foreground">
                        2:36 PM
                      </span>
                      <span className="font-medium text-sm">You</span>
                    </div>
                    <div className="bg-primary rounded-lg p-3">
                      <p className="text-sm text-primary-foreground">
                        Perfect! I'll share the link in a few minutes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="size-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="size-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Chat Input Preview */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-background rounded-lg border px-4 py-2">
                  <p className="text-sm text-muted-foreground">
                    Type a message...
                  </p>
                </div>
                <button className="size-10 rounded-lg bg-primary flex items-center justify-center">
                  <Send className="size-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
