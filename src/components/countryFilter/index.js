import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ContextApi } from '../../contexts/radios';

const COUNTRIES = [
  { code: 'ALL', name: 'Todos', flag: '🌎' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'MZ', name: 'Moçambique', flag: '🇲🇿' },
];

function CountryFilter() {
  const { selectedCountry, setSelectedCountry, radiosApi, setInput } = useContext(ContextApi);

  function handleSelect(country) {
    const countryParam = country === 'Todos' ? '' : country;
    setSelectedCountry(countryParam);
    setInput('');
    radiosApi(countryParam);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={COUNTRIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          const isActive = (selectedCountry === '' && item.code === 'ALL') || selectedCountry === item.name || selectedCountry === item.code || (item.name === 'Todos' && selectedCountry === '');

          return (
            <TouchableOpacity
              style={[styles.button, isActive ? styles.buttonActive : null]}
              onPress={() => handleSelect(item.name)}
            >
              <Text style={styles.flag}>{item.flag}</Text>
              <Text style={[styles.label, isActive ? styles.labelActive : null]}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
    marginBottom: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  buttonActive: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  label: {
    color: '#b8d9c9',
    fontWeight: '700',
  },
  labelActive: {
    color: '#e7f7ef',
  },
});

export default CountryFilter;
