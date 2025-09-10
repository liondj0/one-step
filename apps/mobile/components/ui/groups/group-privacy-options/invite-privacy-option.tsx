import { GroupPrivacyOption } from "@/components/ui/groups/group-privacy-options/group-privacy-option";

export const InvitePrivacyOption = ({ isPublic }: { isPublic: boolean }) => {
  return (
    <GroupPrivacyOption
      selected={isPublic}
      palette={{
        bgTint: "bg-[#FFE7E1]",
        bgTintStrong: "bg-[#FBB8B0]",
        border: "border-[#F4A08F]",
        iconBg: "#FFB199",
        icon: "#7A2E20",
        ringShadow: "shadow-[0_2px_10px_rgba(244,160,143,0.35)]",
        edge: "bg-[#FFD4C9]",
      }}
      title={`Open`}
      subtitle={`Everyone can find it and is welcome`}
    ></GroupPrivacyOption>
  );
};
