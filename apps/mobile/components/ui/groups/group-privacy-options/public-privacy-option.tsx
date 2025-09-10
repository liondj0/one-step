import { GroupPrivacyOption } from "@/components/ui/groups/group-privacy-options/group-privacy-option";

export const PublicPrivacyOption = ({ isPublic }: { isPublic: boolean }) => {
  return (
    <GroupPrivacyOption
      selected={isPublic}
      palette={{
        bgTint: "bg-[#FFF7D6]",
        bgTintStrong: "bg-[#FFE9A7]",
        border: "border-[#F7D25A]",
        iconBg: "#FFD966",
        icon: "#7A5E00",
        ringShadow: "shadow-[0_2px_10px_rgba(247,210,90,0.35)]",
        edge: "bg-[#FBE9A6]",
      }}
      title={`Open`}
      subtitle={`Everyone can find it and is welcome`}
    ></GroupPrivacyOption>
  );
};
