import { Camera, User, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // ✅ Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed.");
      setSelectedImage(null);
      return;
    }

    // ✅ Validate file size
    const MAX_SIZE = 0.5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("File size should not exceed 500KB.");
      setSelectedImage(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;

      if (typeof base64Image === "string") {
        try {
          await updateProfile({ profilePic: base64Image }); // ✅ Try upload first
          setSelectedImage(base64Image); // ✅ Set preview *after* successful upload
        } catch (error: any) {
          if (error.response?.status === 413) {
            toast.error("Image is too large. Please upload one under 1MB.");
          } else {
            toast.error(
              error.response?.data?.error || "Failed to upload image."
            );
          }
          setSelectedImage(null);
        }
      } else {
        toast.error("Image format is not supported.");
        setSelectedImage(null);
      }
    };

    reader.onerror = () => {
      toast.error("Error reading the file.");
      setSelectedImage(null);
    };
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImage || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />

                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}>
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <div className="text-sm text-zinc-400">
                {isUpdatingProfile ? (
                  <div className="flex gap-2 items-center justify-center">
                    <span>Updating</span>
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                ) : (
                  "Click the camera icon to update your photo"
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                    <User className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {authUser.fullName || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                    <Mail className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {authUser.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">
                  Account Information
                </h3>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="font-medium">
                      {authUser.createdAt
                        ? new Date(authUser.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
