<script lang="ts">
  import { Link, Route, Router, navigate } from "svelte-routing";

  import type { TopAppBarComponentDev } from "@smui/top-app-bar";
  import TopAppBar, { AutoAdjust } from "@smui/top-app-bar";

  import Header from "./components/Header.svelte";
  import MyPage from "./pages/MyPage.svelte";
  import SignIn from "./pages/SignIn.svelte";
  import Top from "./pages/Top.svelte";
  import Declaration from "./pages/envelopes/Declaration.svelte";
  import NewEnvelope from "./pages/envelopes/New.svelte";

  let topAppBar: TopAppBarComponentDev;
</script>

<Router>
  <TopAppBar bind:this={topAppBar} variant="fixed">
    <Header />
  </TopAppBar>
  <AutoAdjust {topAppBar}>
    <Route path="/envelopes/:id/declaration" let:params
      ><Declaration envelopeId={params.id} /></Route
    >
    <Route path="/envelopes/new"><NewEnvelope /></Route>
    <Route path="/signin"><SignIn /></Route>
    <Route path="/mypage"><MyPage /></Route>
    <Route path="/"><Top /></Route>
  </AutoAdjust>
</Router>
