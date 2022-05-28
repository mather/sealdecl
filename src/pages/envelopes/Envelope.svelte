<script lang="ts">
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";

  import { signinRequired, userAttributesStore } from "../../lib/session";

  let displayName: string = null;

  signinRequired();

  userAttributesStore.subscribe((attributes) => {
    displayName = attributes?.displayName;
  });
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
  let envelopeName = "";
</script>

<LayoutGrid>
  <Cell span={12}>
    <h1>Create New Envelope</h1>

    <div>
      <p>The "Envelope" refers to the place where the declaration is sealed.</p>
    </div>
    <div>
      <p>
        Your display name "{displayName}" will be recorded as envelope creator. (can't update after
        created)
      </p>
    </div>
  </Cell>

  <Cell span={6}>
    <Textfield label="Envelope Name" bind:value={envelopeName} style="width: 100%" required>
      <HelperText persistent slot="helper"
        >Name of event, game, player, or date, etc. (e.g. Go tournament Jun 18, 2022 - Final - Day
        1)</HelperText
      >
    </Textfield>
  </Cell>
  <Cell span={6}>
    <Button variant="raised"><Label>Create</Label></Button>
  </Cell>
</LayoutGrid>
