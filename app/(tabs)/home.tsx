import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useEffect, useState } from 'react';

interface dataType{
  title?:string,
  body?:string
}

export default function HomeScreen() {
const [data, setData] = useState<dataType>();
  const [loading, setLoading] = useState(true);
  

  const getData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const result = await response.json();
      setData(result); // store the response
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Typography>{data?.title}</Typography>
      <Typography>{data?.body}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
