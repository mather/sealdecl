<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import Button, { Label } from "@smui/button";
  import IconButton from "@smui/icon-button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Snackbar, { Actions } from "@smui/snackbar";
  import type { SnackbarComponentDev } from "@smui/snackbar";
  import Textfield from "@smui/textfield";

  import { updateDisplayName, userAttributesStore } from "../lib/session";

  let displayName = {
    value: "",
    invalid: false,
    dirty: false,
  };
  let email: string = $userAttributesStore?.email;

  let successNotification: SnackbarComponentDev;

  const unsubscribe = userAttributesStore.subscribe((attributes) => {
    displayName.value = attributes?.displayName ?? "";
    email = attributes?.email ?? "";
  });

  onMount(() => {
    if (!email) {
      navigate("/signin");
    }
  });

  const saveWithValidation = () => {
    if (displayName.value.length == 0) {
      displayName.invalid = true;
    } else {
      displayName.invalid = false;
      displayName.dirty = false;
      updateDisplayName(displayName.value).then((result) => {
        if (result) successNotification.open();
      });
    }
  };
</script>

<LayoutGrid fixedColumnWidth>
  <Cell span={12}>
    <div>
      Notification will be send to: <code>{email}</code> (registered in Google account)
    </div>
  </Cell>
  <Cell span={6}>
    <Textfield
      bind:value={displayName.value}
      bind:dirty={displayName.dirty}
      label="Display Name"
      required
      invalid={displayName.invalid}
      style="width: 100%;"
    />
  </Cell>
  <Cell span={6}>
    <Button on:click={saveWithValidation} variant="raised" disabled={!displayName.dirty}
      ><Label>Save</Label></Button
    >
  </Cell>
</LayoutGrid>
<Snackbar bind:this={successNotification}>
  <Label>Saved</Label>
  <Actions>
    <IconButton class="material-icons" style="color: green;">done</IconButton>
  </Actions>
</Snackbar>
