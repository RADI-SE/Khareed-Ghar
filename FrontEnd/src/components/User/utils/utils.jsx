export const getStatusBadgeClass = (role) => {
    const badgeClasses = {
      admin: "bg-primary",
      seller: "bg-success",
      moderator: "bg-warning",
      banned: "bg-danger",
    };
    return badgeClasses[role] || "bg-secondary";
  };
  
  export const handleBanToggle = (banUser, queryClient, refetch, id, currentStatus) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${
        currentStatus === "banned" ? "unban" : "ban"
      } this user?`
    );
    if (!confirmAction) return;
  
    try {
      banUser(
        {
          id,
          role: currentStatus === "banned" ? "buyer" : "banned",
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            refetch();
          },
          onError: (error) => {
            console.error("Error banning/unbanning user:", error);
          },
        }
      );
      alert(
        `${
          currentStatus === "banned" ? "Unbanned" : "Banned"
        } user successfully!`
      );
    } catch (err) {
      console.error("Error banning user:", err);
    }
  };
  
  export const handleSearch = (e, setSearchTerm) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  