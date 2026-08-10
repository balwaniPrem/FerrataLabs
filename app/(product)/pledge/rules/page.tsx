import RuleTable from "@/components/product/RuleTable";
import { workspace } from "@/content/pledge";
import { rules, families } from "@/content/pledgeRules";

export default function RulesPage() {
  return (
    <>
      <div className="app-head">
        <h1>Rules Engine</h1>
        <p>
          Every behavior Pledge exhibits for {workspace.name} is one of these {rules.length} rules
          across {families.length} families. They are the specification, not a description of it —
          changing one changes what the agent does tomorrow morning.
        </p>
      </div>

      <RuleTable />

      <p className="app-foot">
        <span>Toggles are illustrative — this build has no persistence</span>
        <span>Locked rules are the product&rsquo;s promises and cannot be disabled</span>
      </p>
    </>
  );
}
