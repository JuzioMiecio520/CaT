import UnfinishedSetup from "../components/landing/UnfinishedSetup";
import FinishedSetup from "../components/landing/FinishedSetup";

export default function LandingPage() {
    const isFullySetup = true;

    return isFullySetup ? <FinishedSetup /> : <UnfinishedSetup />
}
