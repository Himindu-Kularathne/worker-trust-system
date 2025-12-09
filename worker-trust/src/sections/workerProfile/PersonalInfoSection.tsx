import React from "react";
import { View, StyleSheet } from "react-native";
import InfoCard from "@/src/components/workerProfile/InfoCard";
import InfoRow from "@/src/components/workerProfile/InfoRow";

export type PersonalInfoSectionProps = {
  name: string;
  phone: string;
  email: string;
  languages: string;
};

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  name,
  phone,
  email,
  languages,
}) => {
  return (
    <View style={styles.wrapper}>
      <InfoCard title="Personal Information" showEdit>
        <InfoRow icon="person-outline" text={name} />
        <InfoRow icon="call-outline" text={phone} />
        <InfoRow icon="mail-outline" text={email} />
        <InfoRow icon="language-outline" text={languages} />
      </InfoCard>
    </View>
  );
};

export default PersonalInfoSection;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
});
