import { IStoreFeedback } from "@/src/shared";
import { IProfile } from "./Model";

export default interface IProfileStore{
    profile:IProfile
    setProfile:(user:IProfile) => void
    updateProfile: (
        updateFields: Partial<IProfile> & { password?: string }
    ) => Promise<void>;
}