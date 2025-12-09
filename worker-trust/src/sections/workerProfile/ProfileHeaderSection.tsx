import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileHeader, { ProfileHeaderProps } from "../../components/workerProfile/ProfileHeader";

const ProfileHeaderSection: React.FC<ProfileHeaderProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <ProfileHeader {...props} />
    </View>
  );
};

export default ProfileHeaderSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
});
