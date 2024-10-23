import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/screens/Auth";
import Main from "./components/screens/Main";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import SplashScreen from "./components/screens/Splash";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Animated, { Extrapolation } from "react-native-reanimated";
(Animated as any).Extrapolate = Extrapolation;

export default function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <SplashScreen />;

  // return <GestureHandlerRootView style={{ flex: 1 }}><View><Main session={session!} /></View></GestureHandlerRootView>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        {session && session.user ? (
        <Main key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
    </GestureHandlerRootView>
  );
}
