<script lang="ts">
  import { Link, navigate } from "svelte-routing";

  import Button, { Icon, Label } from "@smui/button";
  import { Row, Section, Title } from "@smui/top-app-bar";

  import { signOut, userAttributesStore } from "../lib/session";

  let displayName: string = null;

  userAttributesStore.subscribe((attributes) => {
    displayName = attributes?.displayName;
  });
</script>

<Row>
  <Section>
    <Title>SealDecl</Title>
  </Section>
  <Section align="end">
    {#if displayName}
      <Button on:click={() => navigate("/mypage")}
        ><Icon class="material-icons">account_circle</Icon><Label>{displayName}</Label></Button
      >
      <Button variant="unelevated" on:click={signOut}
        ><Icon class="material-icons">logout</Icon><Label>Signout</Label></Button
      >
    {:else}
      <Button on:click={() => navigate("/signin")}
        ><Icon class="material-icons">login</Icon><Label>SignIn</Label></Button
      >
    {/if}
    <Link to="/envelopes/AAA/declaration"><Button>Demo</Button></Link>
  </Section>
</Row>
