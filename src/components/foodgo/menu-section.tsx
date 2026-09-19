import { HeartIcon, SearchIcon, SlidersHorizontalIcon, StarIcon, X } from 'lucide-react-native';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { EmptyState } from './empty-state';
import { categories, type Category, type Product } from './menu';
import { INK, RED } from './theme';

type MenuSectionProps = {
  category: Category;
  favourites: string[];
  isFavouritesTab: boolean;
  phoneWidth: number;
  products: Product[];
  query: string;
  scale: number;
  showFilterIndicator: boolean;
  onCategoryChange: (category: Category) => void;
  onClearQuery: () => void;
  onOpenFilters: () => void;
  onOpenProduct: (product: Product) => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
  onToggleFavourite: (id: string) => void;
};

export function MenuSection({
  category,
  favourites,
  isFavouritesTab,
  phoneWidth,
  products,
  query,
  scale,
  showFilterIndicator,
  onCategoryChange,
  onClearQuery,
  onOpenFilters,
  onOpenProduct,
  onQueryChange,
  onReset,
  onToggleFavourite
}: MenuSectionProps) {
  return (
    <>
      <View style={[styles.searchRow, { gap: 12 * scale, paddingHorizontal: 8 }]}>
        <View style={[styles.searchBox, { height: 53 * scale, borderRadius: 18 * scale }]}>
          <SearchIcon color={INK} size={23 * scale} strokeWidth={2.3} />
          <TextInput
            accessibilityLabel='Search burgers'
            placeholder='Search'
            placeholderTextColor={INK}
            value={query}
            onChangeText={onQueryChange}
            style={[styles.searchInput, { fontSize: 14 * scale }]}
            returnKeyType='search'
          />
          {!!query && (
            <Pressable
              accessibilityLabel='Clear search'
              accessibilityRole='button'
              onPress={onClearQuery}
              hitSlop={8}
            >
              <X size={17} color={INK} />
            </Pressable>
          )}
        </View>
        <Pressable
          accessibilityRole='button'
          accessibilityLabel='Filter menu'
          onPress={onOpenFilters}
          style={({ pressed }) => [
            styles.filterButton,
            { width: 53 * scale, height: 53 * scale, borderRadius: 18 * scale },
            pressed && styles.pressed
          ]}
        >
          <SlidersHorizontalIcon color='white' size={25 * scale} />
          {showFilterIndicator && <View style={styles.filterDot} />}
        </Pressable>
      </View>

      <View style={{ height: 46 * scale, marginTop: 35 * scale, marginBottom: 28 * scale }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 * scale, gap: 12 * scale }}
        >
          {categories.map((item) => (
            <Pressable
              key={item}
              accessibilityRole='button'
              accessibilityState={{ selected: category === item }}
              onPress={() => onCategoryChange(item)}
              style={({ pressed }) => [
                styles.category,
                { paddingHorizontal: (item === 'All' ? 24 : 25) * scale, borderRadius: 17 * scale },
                category === item && styles.categoryActive,
                pressed && styles.pressed
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { fontSize: 14 * scale },
                  category === item && styles.white
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {products.length > 0 ? (
        <View
          style={[
            styles.grid,
            { paddingHorizontal: 16 * scale, gap: 20 * scale, rowGap: 27 * scale }
          ]}
        >
          {products.map((product) => (
            <View
              key={product.id}
              style={[
                styles.card,
                { width: (phoneWidth - 52 * scale) / 2, borderRadius: 18 * scale }
              ]}
            >
              <Pressable
                accessibilityRole='button'
                accessibilityLabel={`View ${product.subtitle}`}
                onPress={() => onOpenProduct(product)}
                style={({ pressed }) => [
                  styles.cardMain,
                  { padding: 10 * scale, paddingBottom: 0 },
                  pressed && styles.pressed
                ]}
              >
                <Image
                  source={product.image}
                  resizeMode='contain'
                  style={{ width: '100%', height: 108 * scale, marginBottom: 3 * scale }}
                />
                <Text numberOfLines={1} style={[styles.productName, { fontSize: 13 * scale }]}>
                  {product.name}
                </Text>
                <Text numberOfLines={1} style={[styles.productSubtitle, { fontSize: 12.5 * scale }]}>
                  {product.subtitle}
                </Text>
              </Pressable>
              <View style={[styles.cardFooter, { paddingLeft: 10 * scale }]}>
                <View style={styles.rating}>
                  <StarIcon size={15 * scale} color='#FF9633' fill='#FF9633' strokeWidth={0} />
                  <Text style={[styles.ratingText, { fontSize: 13 * scale }]}>
                    {product.rating.toFixed(1)}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole='button'
                  accessibilityLabel={`${favourites.includes(product.id) ? 'Remove' : 'Save'} ${product.subtitle} ${favourites.includes(product.id) ? 'from' : 'to'} favourites`}
                  accessibilityState={{ selected: favourites.includes(product.id) }}
                  hitSlop={3}
                  onPress={() => onToggleFavourite(product.id)}
                  style={styles.heartButton}
                >
                  <HeartIcon
                    size={22 * scale}
                    strokeWidth={2.5}
                    color={favourites.includes(product.id) ? RED : INK}
                    fill={favourites.includes(product.id) ? RED : 'transparent'}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          title={isFavouritesTab ? 'Your favourites, all here' : 'No burgers found'}
          description={
            isFavouritesTab
              ? 'Tap a heart on the menu to save something delicious for later.'
              : 'Try a different search or reset your filters to find your next favourite.'
          }
          icon={isFavouritesTab ? 'heart' : 'search'}
          onPress={onReset}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchRow: { flexDirection: 'row' },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.11)'
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    color: INK,
    paddingVertical: 10,
    outlineWidth: 0
  },
  filterButton: { backgroundColor: RED, justifyContent: 'center', alignItems: 'center' },
  filterDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFF',
    position: 'absolute',
    right: 8,
    top: 7
  },
  category: {
    backgroundColor: '#F4F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  categoryActive: { backgroundColor: RED, boxShadow: '0 6px 10px rgba(245, 35, 59, 0.18)' },
  categoryText: { fontFamily: 'Poppins-Medium', color: '#757171' },
  white: { color: '#FFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { backgroundColor: '#FFF', boxShadow: '0 5px 13px rgba(0,0,0,0.10)', overflow: 'hidden' },
  cardMain: { flex: 1 },
  productName: { fontFamily: 'Poppins-SemiBold', color: INK, lineHeight: 19 },
  productSubtitle: { fontFamily: 'Poppins', color: INK, lineHeight: 19 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40
  },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontFamily: 'Poppins', color: INK },
  heartButton: { minWidth: 42, minHeight: 40, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] }
});
