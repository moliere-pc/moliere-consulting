import { getSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsForm settings={settings} />;
}
