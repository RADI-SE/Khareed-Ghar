import { User } from "../../model/user.model.js";

// User Management -> View Users -> 1) viewSellers -> 2 viewBuyers
export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.body;   
    const users = await User.find();  
    
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
   
    const filteredUsers = users.filter(user => user.role === role || user.originalRole === role); 
   
    if (filteredUsers.length === 0) {
      return res.status(404).json({ message: "No sellers found." });
    }


    return res.json(filteredUsers);   
  
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ message: "Error fetching users by role", error });
  }  
  
};



// Edit User Profile
export const editUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { name, email, role } = req.body;
    if(!name){
      return res.status(401).json({success:false, message:"user name not found"});
    }
 
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save(); 

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in editUserProfile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const displayUserProfile = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// banUsers
export const banUsers = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If the user is being banned for the first time, save their original role
    if (!user.originalRole) {
      user.originalRole = user.role;
    }

    // Toggle the banned status
    if (user.isBanned) {
      // Unban the user
      user.role = user.originalRole;
      user.isBanned = false;

      console.log("User unbanned successfully");
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User unbanned successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isBanned: user.isBanned,
        },
      });
    } else {
      // Ban the user
      user.role = "banned";
      user.isBanned = true;

      console.log("User banned successfully");
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User banned successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isBanned: user.isBanned,
        },
      });
    }
  } catch (error) {
    console.error("Error in banUsers:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


