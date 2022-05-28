<script>
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { navigate } from "svelte-routing";

  import { signIn, userAttributesStore } from "../lib/session";

  userAttributesStore.subscribe((attributes) => {
    if (attributes) {
      navigate("/mypage");
    }
  });

  const signInAndRedirect = () => {
    signIn().then((result) => {
      if (result) {
        navigate("/mypage");
      }
    });
  };
</script>

<LayoutGrid fixedColumnWidth>
  <Cell span={12} style="text-align: center;">
    <Button on:click={signInAndRedirect} variant="raised"
      ><Label>Sign In with Google Account</Label></Button
    >
  </Cell>
</LayoutGrid>
