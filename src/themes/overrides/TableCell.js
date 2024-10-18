// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
  const commonCell = {
    '&:not(:last-of-type)': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        backgroundColor: theme.palette.divider,
        width: 1,
        height: 'calc(100% - 30px)',
        right: 0,
        top: 16
      }
    }
  };

  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: 12,
          borderColor: theme.palette.divider,
          '&.cell-right': {
            justifyContent: 'flex-end',
            textAlign: 'right',
            '& > *': {
              justifyContent: 'flex-end',
              margin: '0 0 0 auto'
            },
            '& .MuiOutlinedInput-input': {
              textAlign: 'right'
            }
          },
          '&.cell-center': {
            justifyContent: 'center',
            textAlign: 'center',
            '& > *': {
              justifyContent: 'center',
              margin: '0 auto'
            }
          }
        },
        sizeSmall: {
          padding: 8
        },
        head: {
          backgroundColor: theme.palette.background.neutral,
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          ...commonCell
        },
        footer: {
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          ...commonCell
        }
      }
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small'
        },
        nextIconButtonProps: {
          size: 'small'
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2
                }
              }
            }
          }
        }
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`
        },
        toolbar: {
          height: 64
        },
        actions: {
          marginRight: theme.spacing(1)
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius
          }
        }
      }
    }
  };
}
