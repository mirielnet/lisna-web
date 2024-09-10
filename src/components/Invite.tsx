import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

const Invite = () => {
  const navigate = useNavigate();

  onMount(() => {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1262605965296013363";
  });

  return (
    <div>
      <p>Redirecting to Discord Invite...</p>
    </div>
  );
};

export default Invite;
