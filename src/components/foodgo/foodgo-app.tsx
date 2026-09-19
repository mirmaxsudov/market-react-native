import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  Clock3Icon,
  HeartIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  StarIcon,
  X
} from 'lucide-react-native';
import { Action } from './action';
import { BottomNavigation } from './bottom-navigation';
import { EmptyState } from './empty-state';
import { MenuSection } from './menu-section';
import { type Category, money, type Product, products } from './menu';
import { Splash } from './splash';
import { INK, RED } from './theme';
import type { Sheet, Sort, Tab } from './types';

export default function FoodgoApp() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const phoneWidth = width;
  const scale = 1;
  const [intro, setIntro] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;
  const [tab, setTab] = useState<Tab>('home');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [sheet, setSheet] = useState<Sheet>(null);
  const [selected, setSelected] = useState<Product>(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [sort, setSort] = useState<Sort>('Recommended');
  const [vegetarian, setVegetarian] = useState(false);
  const [draftSort, setDraftSort] = useState<Sort>('Recommended');
  const [draftVegetarian, setDraftVegetarian] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [profileName, setProfileName] = useState('Alex Morgan');
  const [address, setAddress] = useState('24 Maple Street');
  const [profileSaved, setProfileSaved] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 350, useNativeDriver: true }).start(() =>
        setIntro(false)
      );
    }, 1800);
    return () => clearTimeout(timer);
  }, [opacity]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (Platform.OS !== 'web' || !sheet) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSheet(null);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [sheet]);

  const toggleFavourite = (id: string) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const changeQuantity = (id: string, delta: number) =>
    setCart((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  const resetMenu = () => {
    setTab('home');
    setCategory('All');
    setQuery('');
    setVegetarian(false);
  };
  const filtered = products
    .filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        (!vegetarian || product.vegetarian) &&
        (tab !== 'favourites' || favourites.includes(product.id)) &&
        `${product.name} ${product.subtitle}`.toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) =>
      sort === 'Price: low to high'
        ? a.price - b.price
        : sort === 'Top rated'
          ? b.rating - a.rating
          : 0
    );
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);
  const openProduct = (product: Product) => {
    setSelected(product);
    setQuantity(1);
    setSheet('product');
  };

  const navigate = (next: Tab) => {
    setTab(next);
    setSheet(null);
    if (next === 'favourites') {
      setCategory('All');
      setQuery('');
      setVegetarian(false);
    }
  };

  const insetBottom = insets.bottom;

  return (
    <View style={styles.screen}>
      <View style={styles.phone}>
        <View style={[styles.phoneFrame, { paddingTop: insets.top }]}>
          <View style={[styles.header, { paddingHorizontal: 16 * scale }]}>
            <View>
              <Text accessibilityRole='header' style={[styles.logo, { fontSize: 40 * scale }]}>
                {tab === 'home'
                  ? 'Foodgo'
                  : tab === 'favourites'
                    ? 'Favourites'
                    : tab === 'cart'
                      ? 'Your order'
                      : 'My profile'}
              </Text>
              <Text className='mb-3' style={[styles.tagline, { fontSize: 15 * scale }]}>
                {tab === 'home'
                  ? 'Order your favourite food!'
                  : tab === 'favourites'
                    ? 'A little love for your favourites.'
                    : tab === 'cart'
                      ? 'Good food. Great mood.'
                      : 'Make yourself at home.'}
              </Text>
            </View>
            <Pressable
              accessibilityRole='button'
              accessibilityLabel='Open profile'
              onPress={() => navigate('profile')}
            >
              <Image
                source={require('../../../assets/images/foodgo/avatar.jpg')}
                style={[
                  styles.avatar,
                  { width: 49 * scale, height: 49 * scale, borderRadius: 15 * scale }
                ]}
              />
            </Pressable>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
          >
            {(tab === 'home' || tab === 'favourites') && (
              <MenuSection
                category={category}
                favourites={favourites}
                isFavouritesTab={tab === 'favourites'}
                phoneWidth={phoneWidth}
                products={filtered}
                query={query}
                scale={scale}
                showFilterIndicator={vegetarian || sort !== 'Recommended'}
                onCategoryChange={setCategory}
                onClearQuery={() => setQuery('')}
                onOpenFilters={() => {
                  setDraftSort(sort);
                  setDraftVegetarian(vegetarian);
                  setSheet('filters');
                }}
                onOpenProduct={openProduct}
                onQueryChange={setQuery}
                onReset={resetMenu}
                onToggleFavourite={toggleFavourite}
              />
            )}
            {tab === 'cart' &&
              (orderPlaced ? (
                <View style={styles.empty}>
                  <View style={styles.emptyIcon}>
                    <CheckIcon size={38} color={RED} />
                  </View>
                  <Text style={styles.sectionTitle}>You’ve got great taste!</Text>
                  <Text style={styles.emptyDescription}>
                    Your demo order is confirmed. No payment was taken and no real order was sent.
                  </Text>
                  <Action
                    label='Back to the menu'
                    onPress={() => {
                      setOrderPlaced(false);
                      resetMenu();
                    }}
                  />
                </View>
              ) : cartCount === 0 ? (
                <EmptyState
                  title='Something delicious awaits'
                  description='Your bag is empty. Find your favourite burger and make it a meal.'
                  onPress={resetMenu}
                />
              ) : (
                <View style={styles.pageBody}>
                  <View style={styles.delivery}>
                    <MapPinIcon size={20} color={RED} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.smallLabel}>Deliver to</Text>
                      <Text style={styles.bodyMedium}>
                        {address || 'Add your delivery address'}
                      </Text>
                    </View>
                    <Pressable
                      accessibilityRole='button'
                      accessibilityLabel='Edit delivery address'
                      onPress={() => navigate('profile')}
                    >
                      <ChevronRightIcon color={INK} size={20} />
                    </Pressable>
                  </View>
                  {products
                    .filter((product) => cart[product.id])
                    .map((product) => (
                      <View key={product.id} style={styles.cartItem}>
                        <Image
                          source={product.image}
                          style={styles.cartImage}
                          resizeMode='contain'
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={styles.bodyMedium}>{product.subtitle}</Text>
                          <Text style={styles.price}>{money(product.price)}</Text>
                          <View style={styles.quantity}>
                            <Pressable
                              accessibilityRole='button'
                              accessibilityLabel={`Remove one ${product.subtitle}`}
                              onPress={() => changeQuantity(product.id, -1)}
                              style={styles.quantityButton}
                            >
                              <MinusIcon color={RED} size={16} />
                            </Pressable>
                            <Text style={styles.bodyMedium}>{cart[product.id]}</Text>
                            <Pressable
                              accessibilityRole='button'
                              accessibilityLabel={`Add one ${product.subtitle}`}
                              onPress={() => changeQuantity(product.id, 1)}
                              style={styles.quantityButton}
                            >
                              <PlusIcon color={RED} size={16} />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    ))}
                  <View style={styles.totals}>
                    <View style={styles.totalRow}>
                      <Text style={styles.body}>Subtotal</Text>
                      <Text style={styles.bodyMedium}>{money(total)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                      <Text style={styles.body}>Delivery</Text>
                      <Text style={styles.bodyMedium}>Free</Text>
                    </View>
                    <View style={[styles.totalRow, styles.totalFinal]}>
                      <Text style={styles.sectionTitle}>Total</Text>
                      <Text style={styles.sectionTitle}>{money(total)}</Text>
                    </View>
                  </View>
                  <Action
                    label='Place demo order'
                    onPress={() => {
                      setOrderPlaced(true);
                      setCart({});
                    }}
                  />
                  <Text style={styles.demoNote}>Demo checkout · no payment required</Text>
                </View>
              ))}
            {tab === 'profile' && (
              <View style={styles.pageBody}>
                <Image
                  source={require('../../../assets/images/foodgo/avatar.jpg')}
                  style={styles.profileAvatar}
                />
                <Text style={styles.fieldLabel}>Your name</Text>
                <TextInput
                  accessibilityLabel='Your name'
                  value={profileName}
                  onChangeText={(value) => {
                    setProfileName(value);
                    setProfileSaved(false);
                  }}
                  style={styles.field}
                />
                <Text style={styles.fieldLabel}>Delivery address</Text>
                <TextInput
                  accessibilityLabel='Delivery address'
                  value={address}
                  onChangeText={(value) => {
                    setAddress(value);
                    setProfileSaved(false);
                  }}
                  style={styles.field}
                />
                <Action
                  label={profileSaved ? 'Details saved' : 'Save details'}
                  onPress={() => {
                    setProfileSaved(true);
                    setToast('Your details have been updated');
                  }}
                />
                {profileSaved && (
                  <Text accessibilityLiveRegion='polite' style={styles.demoNote}>
                    Saved for this visit.
                  </Text>
                )}
                <Pressable
                  accessibilityRole='button'
                  onPress={() => navigate('favourites')}
                  style={styles.profileLink}
                >
                  <HeartIcon color={RED} size={21} />
                  <Text style={[styles.bodyMedium, { flex: 1 }]}>My favourites</Text>
                  <Text style={styles.body}>{favourites.length}</Text>
                  <ChevronRightIcon color={INK} size={18} />
                </Pressable>
                <Pressable
                  accessibilityRole='button'
                  onPress={() => {
                    opacity.setValue(1);
                    setIntro(true);
                    setTimeout(() => setIntro(false), 2000);
                  }}
                  style={styles.profileLink}
                >
                  <ArrowLeftIcon color={RED} size={21} />
                  <Text style={[styles.bodyMedium, { flex: 1 }]}>Replay splash screen</Text>
                  <ChevronRightIcon color={INK} size={18} />
                </Pressable>
              </View>
            )}
          </ScrollView>
          <BottomNavigation
            activeTab={tab}
            cartCount={cartCount}
            insetBottom={insetBottom}
            phoneWidth={phoneWidth}
            scale={scale}
            onNavigate={(nextTab) => {
              if (nextTab === 'cart') setOrderPlaced(false);
              navigate(nextTab);
            }}
          />

          {!!toast && (
            <View accessibilityLiveRegion='polite' style={styles.toast}>
              <CheckIcon size={17} color='white' />
              <Text style={styles.toastText}>{toast}</Text>
            </View>
          )}

          {sheet && (
            <View style={styles.sheetOverlay} accessibilityViewIsModal>
              <Pressable
                accessibilityRole='button'
                accessibilityLabel='Close dialog'
                onPress={() => setSheet(null)}
                style={styles.scrim}
              />
              <View
                role='dialog'
                aria-label={sheet === 'filters' ? 'Filter menu' : selected.subtitle}
                style={[styles.sheet, { paddingBottom: Math.max(24, insetBottom) }]}
              >
                <View style={styles.sheetHandle} />
                <Pressable
                  accessibilityRole='button'
                  accessibilityLabel='Close dialog'
                  onPress={() => setSheet(null)}
                  style={styles.closeButton}
                >
                  <X color={INK} size={22} />
                </Pressable>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps='handled'
                >
                  {sheet === 'filters' ? (
                    <>
                      <Text style={styles.sectionTitle}>Just the way you like it</Text>
                      <Text style={styles.sheetSubtitle}>Find your perfect bite.</Text>
                      <Text style={styles.fieldLabel}>Sort by</Text>
                      {(['Recommended', 'Top rated', 'Price: low to high'] as Sort[]).map(
                        (option) => (
                          <Pressable
                            key={option}
                            accessibilityRole='radio'
                            accessibilityState={{ checked: draftSort === option }}
                            onPress={() => setDraftSort(option)}
                            style={styles.filterOption}
                          >
                            <Text style={styles.body}>{option}</Text>
                            <View
                              style={[styles.radio, draftSort === option && { borderColor: RED }]}
                            >
                              {draftSort === option && <View style={styles.radioInner} />}
                            </View>
                          </Pressable>
                        )
                      )}
                      <Pressable
                        accessibilityRole='switch'
                        accessibilityState={{ checked: draftVegetarian }}
                        onPress={() => setDraftVegetarian(!draftVegetarian)}
                        style={[styles.filterOption, { marginVertical: 18 }]}
                      >
                        <View>
                          <Text style={styles.bodyMedium}>Vegetarian only</Text>
                          <Text style={styles.smallLabel}>All the flavour, all plants</Text>
                        </View>
                        <View style={[styles.toggle, draftVegetarian && { backgroundColor: RED }]}>
                          <View
                            style={[
                              styles.toggleThumb,
                              draftVegetarian && { alignSelf: 'flex-end' }
                            ]}
                          />
                        </View>
                      </Pressable>
                      <Action
                        label='Show results'
                        onPress={() => {
                          setSort(draftSort);
                          setVegetarian(draftVegetarian);
                          setSheet(null);
                        }}
                      />
                      <Action
                        label='Reset filters'
                        light
                        onPress={() => {
                          setDraftSort('Recommended');
                          setDraftVegetarian(false);
                          setSort('Recommended');
                          setVegetarian(false);
                          setCategory('All');
                          setQuery('');
                          setSheet(null);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        source={selected.image}
                        style={styles.detailImage}
                        resizeMode='contain'
                      />
                      <View style={styles.detailHeading}>
                        <View>
                          <Text style={styles.sectionTitle}>{selected.name}</Text>
                          <Text style={styles.body}>{selected.subtitle}</Text>
                        </View>
                        <Pressable
                          accessibilityRole='button'
                          accessibilityLabel='Toggle product favourite'
                          accessibilityState={{ selected: favourites.includes(selected.id) }}
                          onPress={() => toggleFavourite(selected.id)}
                          style={styles.heartButton}
                        >
                          <HeartIcon
                            color={RED}
                            fill={favourites.includes(selected.id) ? RED : 'transparent'}
                            size={25}
                          />
                        </Pressable>
                      </View>
                      <View style={styles.detailMeta}>
                        <StarIcon size={17} fill='#FF9633' color='#FF9633' />
                        <Text style={styles.bodyMedium}>{selected.rating}</Text>
                        <View style={styles.metaDot} />
                        <Clock3Icon size={16} color='#8C8584' />
                        <Text style={styles.body}>15–20 min</Text>
                      </View>
                      <Text style={styles.description}>{selected.description}</Text>
                      <View style={styles.detailBottom}>
                        <Text style={styles.detailPrice}>{money(selected.price * quantity)}</Text>
                        <View style={styles.quantity}>
                          <Pressable
                            accessibilityRole='button'
                            accessibilityLabel='Decrease quantity'
                            accessibilityState={{ disabled: quantity === 1 }}
                            disabled={quantity === 1}
                            onPress={() => setQuantity((value) => Math.max(1, value - 1))}
                            style={[styles.quantityButton, quantity === 1 && { opacity: 0.4 }]}
                          >
                            <MinusIcon color={RED} size={18} />
                          </Pressable>
                          <Text style={styles.bodyMedium}>{quantity}</Text>
                          <Pressable
                            accessibilityRole='button'
                            accessibilityLabel='Increase quantity'
                            onPress={() => setQuantity((value) => value + 1)}
                            style={styles.quantityButton}
                          >
                            <PlusIcon color={RED} size={18} />
                          </Pressable>
                        </View>
                      </View>
                      <Action
                        label='Add to bag'
                        onPress={() => {
                          changeQuantity(selected.id, quantity);
                          setOrderPlaced(false);
                          setSheet(null);
                          setToast(
                            `${quantity > 1 ? `${quantity} burgers` : selected.subtitle} added to your bag`
                          );
                        }}
                      >
                        <ShoppingBagIcon size={20} color='white' />
                      </Action>
                    </>
                  )}
                </ScrollView>
              </View>
            </View>
          )}

          {intro && (
            <Animated.View style={[StyleSheet.absoluteFill, { opacity, zIndex: 20 }]}>
              <Splash onPress={() => setIntro(false)} />
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: '100%', backgroundColor: 'white' },
  phone: { flex: 1, width: '100%', backgroundColor: 'white' },
  phoneFrame: { flex: 1, overflow: 'hidden', backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logo: { fontFamily: 'Lobster', color: INK },
  tagline: { fontFamily: 'Poppins', color: '#777474', marginTop: 0 },
  avatar: { marginTop: 0, backgroundColor: '#F9E8EA' },
  content: { flex: 1 },
  heartButton: { minWidth: 42, minHeight: 40, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  pageBody: { padding: 22, paddingTop: 32, gap: 14 },
  sectionTitle: { fontFamily: 'Poppins-SemiBold', color: INK, fontSize: 21 },
  body: { fontFamily: 'Poppins', fontSize: 13, color: '#777171' },
  bodyMedium: { fontFamily: 'Poppins-Medium', fontSize: 13, color: INK },
  smallLabel: { fontFamily: 'Poppins', color: '#99908E', fontSize: 11 },
  price: { fontFamily: 'Poppins-SemiBold', color: RED, fontSize: 15, marginVertical: 4 },
  empty: { alignItems: 'center', padding: 26, paddingTop: 48, gap: 12 },
  emptyIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFF1F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  emptyDescription: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: '#918987',
    lineHeight: 22,
    textAlign: 'center'
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFF3F4',
    borderRadius: 16,
    gap: 10
  },
  cartItem: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2EEEE'
  },
  cartImage: { width: 92, height: 92 },
  quantity: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFF1F3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  totals: { paddingTop: 8, gap: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalFinal: { borderTopWidth: 1, borderTopColor: '#EEE8E8', paddingTop: 16 },
  demoNote: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: '#A09695',
    textAlign: 'center',
    marginTop: 2
  },
  profileAvatar: { width: 85, height: 85, borderRadius: 28, alignSelf: 'center', marginBottom: 12 },
  fieldLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: INK,
    marginTop: 12,
    marginBottom: 5
  },
  field: {
    backgroundColor: '#F8F6F6',
    padding: 15,
    borderRadius: 13,
    fontFamily: 'Poppins',
    fontSize: 14,
    color: INK
  },
  profileLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    minHeight: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#F4EEEE'
  },
  toast: {
    position: 'absolute',
    bottom: 105,
    left: 20,
    right: 20,
    borderRadius: 14,
    padding: 14,
    backgroundColor: INK,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    zIndex: 12
  },
  toastText: { fontFamily: 'Poppins', fontSize: 12, color: 'white', flex: 1 },
  sheetOverlay: { ...StyleSheet.absoluteFill, zIndex: 10, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(35,20,18,0.38)' },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '92%',
    padding: 24,
    paddingTop: 32,
    boxShadow: '0 -5px 30px rgba(0,0,0,0.08)'
  },
  sheetHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E9E4E3',
    position: 'absolute',
    top: 11,
    alignSelf: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 14,
    padding: 10,
    zIndex: 1,
    borderRadius: 22,
    backgroundColor: '#F8F5F4'
  },
  sheetSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: '#918987',
    marginTop: 4,
    marginBottom: 12
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F4EFEF'
  },
  radio: {
    width: 21,
    height: 21,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D7D0CF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioInner: { backgroundColor: RED, width: 11, height: 11, borderRadius: 6 },
  toggle: {
    width: 43,
    height: 26,
    borderRadius: 14,
    backgroundColor: '#DED9D8',
    padding: 3,
    justifyContent: 'center'
  },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: 'white' },
  detailImage: { width: '100%', height: 205, marginTop: 10, marginBottom: 18 },
  detailHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 18 },
  metaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#BBB', marginHorizontal: 8 },
  description: { fontFamily: 'Poppins', fontSize: 13, lineHeight: 23, color: '#918987' },
  detailBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 12
  },
  detailPrice: { fontFamily: 'Poppins-SemiBold', fontSize: 27, color: RED }
});
