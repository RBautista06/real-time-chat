import { MessageSquare } from "lucide-react";

const RightSideHero = () => {
  return (
    <div className="hidden lg:flex bg-muted/50 flex-col justify-center items-center p-12">
      <div className="max-w-md text-center space-y-6">
        <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <MessageSquare className="size-12 text-primary" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Welcome to Our Platform</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of users who trust our platform for their daily
            communication needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
              <div className="size-2 rounded-full bg-green-600"></div>
            </div>
            <span className="text-sm text-muted-foreground">
              Secure & Private
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="size-2 rounded-full bg-blue-600"></div>
            </div>
            <span className="text-sm text-muted-foreground">Easy to Use</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center">
              <div className="size-2 rounded-full bg-purple-600"></div>
            </div>
            <span className="text-sm text-muted-foreground">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideHero;
