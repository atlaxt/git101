import type { ContentNavigationItem } from '@nuxt/content'
import type { /* PageSchema, */ Section } from '~/types'

export const useContentStore = defineStore('contents', () => {
  const page = ref()
  const navigation = ref<ContentNavigationItem[]>([])
  const sections = ref<Section[]>([])
  const sort = ref<{ stem: string, subStems: string[] }[]>([
    {
      stem: 'git_kurulumu',
      subStems: ['git_kurulumu/git_kurulumu'],
    },
    {
      stem: 'versiyon_kontrolune_giris',
      subStems: [
        'versiyon_kontrolune_giris/versiyon__kontrolu_nedir',
        'versiyon_kontrolune_giris/neden_versiyon_kontrolune_ihtiyacimiz_var',
        'versiyon_kontrolune_giris/git_tarihcesi',
        'versiyon_kontrolune_giris/git_ile_calismaya_baslamak',
        'versiyon_kontrolune_giris/basit_anlamda_versiyon_kontrolu_is_akisi',
        'versiyon_kontrolune_giris/yeni_bir_proje_olusturmak',
        'versiyon_kontrolune_giris/remote_bir_proje_olusturmak',
        'versiyon_kontrolune_giris/projeniz_uzerinde_calismaya_baslayalim',
      ],
    },
    {
      stem: 'branching_dallanma_ve_merging_birlestirme',
      subStems: [
        'branching_dallanma_ve_merging_birlestirme/branching_nedir-_ne_ise_yarar',
        'branching_dallanma_ve_merging_birlestirme/branchler_ile_calismak',
        'branching_dallanma_ve_merging_birlestirme/degisikliklerinizi_gecici_olarak_kaydetmek',
        'branching_dallanma_ve_merging_birlestirme/local_bir_branchde_calismak',
        'branching_dallanma_ve_merging_birlestirme/degisiklikleri_merge_etmek',
        'branching_dallanma_ve_merging_birlestirme/branching_is_akislari',
      ],
    },
    {
      stem: 'remote_repositoryler',
      subStems: [
        'remote_repositoryler/remote_bir_repositorye_baglanti_saglamak',
        'remote_repositoryler/remote_repositorydeki_verilerin_incelenmesi',
        'remote_repositoryler/remote_degisiklikleri_entegre_etmek',
        'remote_repositoryler/local_bir_branchi_yayinlamak_publish',
        'remote_repositoryler/branchleri_silmek',
      ],
    },
    {
      stem: 'ileri_seviye_komutlar_ve_islemler',
      subStems: [
        'ileri_seviye_komutlar_ve_islemler/degisikliklerinizi_geri_almak',
        'ileri_seviye_komutlar_ve_islemler/diff_ile_farklari_incelemek',
        'ileri_seviye_komutlar_ve_islemler/cakismalari_gidermek',
        'ileri_seviye_komutlar_ve_islemler/merge_alternatifi_olarak_rebase_kullanimi',
      ],
    },
    {
      stem: 'git_arac_ve_servisleri',
      subStems: [
        'git_arac_ve_servisleri/masaustu_gorsel_git_uygulamalari',
        'git_arac_ve_servisleri/diffmerge_araclari',
        'git_arac_ve_servisleri/cevrimici_git_servisleri',
        'git_arac_ve_servisleri/kaynakca_ve_referanslar',
      ],
    },
    {
      stem: 'alistirmalar',
      subStems: [
        'alistirmalar/gun_01',
        'alistirmalar/gun_02',
        'alistirmalar/gun_03',
        'alistirmalar/gun_04',
        'alistirmalar/gun_05',
        'alistirmalar/gun_06',
        'alistirmalar/gun_07',
        'alistirmalar/gun_08',
        'alistirmalar/gun_09',
        'alistirmalar/gun_10',
        'alistirmalar/gun_11',
      ],
    },
  ])

  const cleanId = (id: string) => id.replace(/-/g, ' ')
  const formatId = (label: string) => label.split(' ').join('-')

  const _isNavigationSet = ref(false)
  const setNavigation = (contentNavigationItem: ContentNavigationItem[] | undefined | null) => {
    if (!_isNavigationSet.value && contentNavigationItem) {
      const sortedNavigation = contentNavigationItem
        .filter(n => n.stem && !n.stem.includes('index'))
        .sort((a, b) => {
          const indexA = sort.value.findIndex(s => a.stem?.startsWith(s.stem))
          const indexB = sort.value.findIndex(s => b.stem?.startsWith(s.stem))
          return (indexA === -1 ? sort.value.length : indexA) - (indexB === -1 ? sort.value.length : indexB)
        })
        .map((n) => {
          const currentSort = sort.value.find(s => n.stem?.startsWith(s.stem))
          const sortedChildren = n.children?.filter(sn => !sn.stem?.includes('/index'))
            .sort((a, b) => {
              const aIndex = currentSort?.subStems.indexOf(a.stem || '') ?? Infinity
              const bIndex = currentSort?.subStems.indexOf(b.stem || '') ?? Infinity
              return aIndex - bIndex
            }) ?? []

          return {
            ...n,
            title: n.stem?.replace(/_/g, ' ') ?? '',
            children: sortedChildren,
          }
        })

      navigation.value = sortedNavigation
      _isNavigationSet.value = true
    }
  }

  const setSections = (_page: any) => {
    page.value = _page
    sections.value = []

    let currentSection: Section | null = null

    _page.body.value.forEach((item: any) => {
      if (item[0] === 'h2') {
        if (currentSection)
          sections.value.push(currentSection)

        currentSection = {
          id: formatId(item[1].id),
          label: cleanId(item[1].id),
          subSections: [],
        }
      }
      else if (item[0] === 'h3' && currentSection) {
        currentSection.subSections?.push({
          id: formatId(item[1].id),
          label: cleanId(item[1].id),
        })
      }
    })

    if (currentSection)
      sections.value.push(currentSection)

    sections.value.sort((a, b) => {
      const findIndex = (label: string) => {
        const match = sort.value.find(s => s.subStems.some(stem => stem.endsWith(label)))
        return match ? sort.value.indexOf(match) * 100 + match.subStems.findIndex(stem => stem.endsWith(label)) : Infinity
      }
      return findIndex(a.id) - findIndex(b.id)
    })
  }

  return {
    page,
    navigation,
    sections,
    setNavigation,
    setSections,
  }
})
